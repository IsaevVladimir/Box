using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using AutoMapper.Configuration;
using WebApp.Common;
using WebApp.DataAccess.DataModels;
using WebApp.Host.Services.FinanceService.Models;
using WebApp.Host.Services.TableService.Models;
using WebApp.Host.Services.UserService.Models;

namespace WebApp.Host.Services
{
    public class ServiceMapper
    {
        private IMapper _mapper;
        private static ServiceMapper _thisMapper;
        public static IMapper Mapper
        {
            get
            {
                if (_thisMapper == null)
                {
                    _thisMapper = new ServiceMapper();
                }
                return _thisMapper._mapper;
            }
        }
        
        public ServiceMapper()
        {
            var config = new MapperConfigurationExpression();
            this.InitializeMapper(config);
            this._mapper = new MapperConfiguration(config).CreateMapper();
        }

        private void InitializeMapper(MapperConfigurationExpression config)
        {
            #region user service
            
            config.CreateMap<UserDm, UserDto>();
            config.CreateMap<RegistrationDto, UserDm>()
                .ForMember(d => d.PasswordHash, 
                    s =>
                        s.MapFrom(x => PasswordHelper.Encrypt(x.Password)));
            
            #endregion
            
            #region finance service

            config.CreateMap<CheckDm, CheckDto>()
                .ForMember(d => d.Coordinates, src =>
                    src.MapFrom(z =>
                        (z.Longitude == null || z.Latitude == null ? default(List<double>) : new List<double>() { z.Longitude.Value, z.Latitude.Value })));
            
            config.CreateMap<CheckDto, CheckDm>()
                .ForMember(d => d.Longitude, src =>
                    src.MapFrom(z =>
                        (z.Coordinates == null || !z.Coordinates.Any() ? default(double?) : z.Coordinates.FirstOrDefault())))
                .ForMember(d => d.Latitude, src =>
                    src.MapFrom(z =>
                        (z.Coordinates == null || !z.Coordinates.Any() ? default(double?) : z.Coordinates.LastOrDefault())));
            
            config.CreateMap<CheckCategoryDm, CheckCategoryDto>().ReverseMap();
            #endregion

            #region table service

            config.CreateMap<TableCellDm, CellDto>().ReverseMap();

            #endregion
        }
    }
}