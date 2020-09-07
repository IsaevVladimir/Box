using AutoMapper;
using AutoMapper.Configuration;
using WebApp.DataAccess.DataModels;
using WebApp.DataAccess.Entity;

namespace WebApp.DataAccess
{
    public class DataAccessMapper
    {
        private IMapper _mapper;
        private static DataAccessMapper _thisMapper;
        public static IMapper Mapper
        {
            get
            {
                if (_thisMapper == null)
                {
                    _thisMapper = new DataAccessMapper();
                }
                return _thisMapper._mapper;
            }
        }
        
        public DataAccessMapper()
        {
            var config = new MapperConfigurationExpression();
            this.InitializeMapper(config);
            this._mapper = new MapperConfiguration(config).CreateMapper();
        }

        private void InitializeMapper(MapperConfigurationExpression config)
        {
            config.CreateMap<User, UserDm>();
            config.CreateMap<UserDm, User>();
            
            config.CreateMap<Check, CheckDm>();
            config.CreateMap<CheckDm, Check>();
            
            config.CreateMap<CheckCategory, CheckCategoryDm>();
            config.CreateMap<CheckCategoryDm, CheckCategory>();
        }
    }
}