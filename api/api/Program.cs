using DbUp;

var builder = WebApplication.CreateBuilder(args);


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



// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
