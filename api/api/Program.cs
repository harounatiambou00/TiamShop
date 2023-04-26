global using api.Models;

//Services
global using api.Services.EmailService;
global using api.Services.UserService;
global using api.Services.JwtService;
global using api.Services.UserTypeService;
global using api.Services.ImageService;
global using api.Services.NeighborhoodService;

//DTOs
global using api.DTOs.UserDTOs;
global using api.DTOs.UserDTOs.Admins;
global using api.DTOs.UserDTOs.Clients;

//Data
global using api.Data.ServiceResponse;



using DbUp;
using api.Services.BrandService;
using api.Services.CategoryService;
using api.Services.SubCategoryService;
using api.Services.ProductCaracteristicService;
using api.Services.ProductService;
using api.Services.ProductImageService;
using api.Services.ProductDiscountService;
using api.Services.ProductGradeService;
using api.Services.DeliveryService;
using api.Services.OrderService;
using api.Services.OrderLineService;

var builder = WebApplication.CreateBuilder(args);

//Adding cors
builder.Services.AddCors();

var AllowOrigins = "_allowOrigins";

//This gets the database connection from the appsettings.json file and creates the database if it doesn't exist.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
EnsureDatabase.For.SqlDatabase(connectionString);

/**
 * Setting up dbup-sqlserver and upgrade
*/
var dbupUpgrader = DeployChanges.To.SqlDatabase(connectionString, null)
                                    .WithScriptsEmbeddedInAssembly(
                                        System.Reflection.Assembly.GetExecutingAssembly()
                                        )
                                    .WithTransaction()
                                    .Build();
// check whether there are any pending SQL Scripts, and using the PerformUpgrade method to do the actual migration.
if (dbupUpgrader.IsUpgradeRequired())
{
    dbupUpgrader.PerformUpgrade();
}


/**
    Adding services scopes.
 */
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserTypeService, UserTypeService>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<INeighborhoodService, NeighborhoodService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<IBrandService, BrandService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ISubCategoryService, SubCategoryService>();
builder.Services.AddScoped<IProductCarateristicService, ProductCaracteristicService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IProductImageService, ProductImageService>();
builder.Services.AddScoped<IProductDiscountService, ProductDiscountService>();
builder.Services.AddScoped<IProductGradeService, ProductGradeService>();
builder.Services.AddScoped<IDeliveryService, DeliveryService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IOrderLineService, OrderLineService>();

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Configuring cors so that our client app can have access to the api
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
                      policy =>
                      {
                          policy.WithOrigins(new string[] {
                                    "http://localhost:3000",
                                    "http://localhost:3000/product-details/",
                                    "http://localhost:3000/product-details/40789A01-75EC-47C7-A5E4-DC6631167D14",
                                    "https://tiamshop.netlify.app",
                                    "https://tiamshopniger.com"
                                })
                                .AllowAnyMethod()
                                .AllowAnyHeader()
                                .AllowCredentials();
                       });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
