using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WebApp.DataAccess;
using WebApp.DataAccess.Repositories;
using WebApp.Host.Hubs;
using WebApp.Host.Services.FinanceService;
using WebApp.Host.Services.FinanceService.Implementations;
using WebApp.Host.Services.TableService;
using WebApp.Host.Services.UserService;

namespace WebApp.Host
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "Client/build"; });
            
            services.AddDbContext<CustomDbContext>(options => 
                options.UseNpgsql(_configuration.GetSection("DataBase:ConnectionString").Value));

            services.AddSignalR();
            
            services.AddScoped<UserRepository>();
            services.AddScoped<CheckRepository>();
            services.AddScoped<CheckCategoryRepository>();
            services.AddScoped<TableCellRepository>();
            services.AddScoped<TableRowRepository>();
            
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IFinanceService, FinanceService>();
            services.AddScoped<ITableService, TableService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute("default", "{controller}/{id?}");
                endpoints.MapHub<TableHub>("/tablehub");
            });
            
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            InitializeDatabase(app);
        }
        
        private void InitializeDatabase(IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<CustomDbContext>().Database;
            if (dbContext.GetPendingMigrations().Any())
                dbContext.Migrate();
        }
    }
}