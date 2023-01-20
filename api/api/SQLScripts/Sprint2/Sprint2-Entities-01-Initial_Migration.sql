
CREATE TABLE dbo.tblImages(
	ImageId bigint IDENTITY(1, 1) NOT NULL PRIMARY KEY,
	ImageName nvarchar(100),
	ImageDescription nvarchar(500),
	ImageExtension nvarchar(10),
	ImageBytes  varbinary(max) NOT NULL, 
	ImageSize decimal(7),
);

CREATE TABLE dbo.tblBrands ( 
	BrandId int IDENTITY(1, 1),
	BrandName nvarchar(100) NOT NULL UNIQUE,
	PartnershipDate DATETIME2 NULL,
	BrandWebsiteLink nvarchar(max),
	BrandImageId bigint NOT NULL,
	CONSTRAINT FK_ImageBrand FOREIGN KEY(BrandImageId) REFERENCES dbo.tblImages(ImageId),

	CONSTRAINT PK_Brand PRIMARY KEY(BrandId), 
);

CREATE TABLE dbo.tblCategories (
	CategoryId int IDENTITY(1, 1),
	CategoryName nvarchar(100) NOT NULL UNIQUE,
	CategoryTitle nvarchar(100) NOT NULL UNIQUE,
	CategoryImageId bigint NOT NULL,
	CategoryRanking int NOT NULL,

	CONSTRAINT FK_ImageCategory FOREIGN KEY(CategoryImageId) REFERENCES dbo.tblImages(ImageId),
	CONSTRAINT PK_Category PRIMARY KEY(CategoryId),
);

CREATE TABLE dbo.tblSubCategories (
	SubCategoryId int IDENTITY(1, 1),
	SubCategoryName nvarchar(100) NOT NULL UNIQUE,
	SubCategoryTitle nvarchar(100) NOT NULL UNIQUE,
	SubCategoryImageId Bigint NOT NULL,
	SubCategoryRanking int NOT NULL,
	CategoryId int NOT NULL,

	CONSTRAINT PK_SubCategory PRIMARY KEY(SubCategoryId),
	CONSTRAINT FK_CategorySubCategory FOREIGN KEY(CategoryId) REFERENCES tblCategories(CategoryId),
	CONSTRAINT FK_ImageSubCategory FOREIGN KEY(SubCategoryImageId) REFERENCES dbo.tblImages(ImageId),
);

CREATE TABLE dbo.tblProducts(
	ProductId UNIQUEIDENTIFIER DEFAULT NEWID(), 
	ProductReference CHAR(12) NOT NULL,
	ProductName nvarchar(100) NOT NULL,
	ProductDescription nvarchar(max) NOT NULL,
	ProductPrice MONEY NOT NULL,
	ProductQuantity int NOT NULL DEFAULT 0,
	ProductPrincipalImageId bigint NOT NULL,
	CreatedAt DATETIME2 DEFAULT GETDATE(),
	Waranty nvarchar(50) NULL,
	Color nvarchar(50) NULL,
	
	OperatingSystem nvarchar(200) NULL, -- Computers && Smartphones && Tablets
	RAM nvarchar(100) NULL, -- Computers && Smartphones && Tablets
	HardDisks nvarchar(500) NULL, -- Computers
	Processor nvarchar(500) NULL, -- Computers
	GraphicCard nvarchar(500) NULL, -- Computers
	InputOutputs nvarchar(500) NULL, -- Computers && Smartphones && Tablets
	ScreenSize nvarchar(100) NULL, -- Computers && Smartphones && Tablets && Télévision && Monitor
	ScreenResolution nvarchar(500) NULL, -- Computers && Smartphones && Tablets && Télévision && Monitor
	TouchScreen bit DEFAULT 0, -- Computers && Smartphones && Tablets
	Network nvarchar(500) NULL, -- Computers && Smartphones && Tablets
	Camera nvarchar(500) NULL, -- Computers && Smartphones && Tablets
	DoubleCamera BIT DEFAULT 0 NULL, -- Smartphone && Tablets
	SmartTV BIT DEFAULT 0 NULL, -- Télévision

	Discount FLOAT DEFAULT 0,
	
	BrandId int NOT NULL,
	SubCategoryId int NOT NULL,

	CONSTRAINT PK_Product PRIMARY KEY(ProductId),
);

CREATE TABLE dbo.tblProductImages(
	ProductImageId  bigint IDENTITY(1,1),
	ProductId UNIQUEIDENTIFIER NOT NULL,

	CONSTRAINT PK_ProductImages PRIMARY KEY(ProductImageId, ProductId),
	CONSTRAINT FK_ImageProductImage FOREIGN KEY(ProductImageId) REFERENCES dbo.tblImages(ImageId),
	CONSTRAINT FK_ProductProductImage FOREIGN KEY(ProductId) REFERENCES dbo.tblProducts(ProductId),
);

CREATE TABLE dbo.tblStores (
	StoreId int IDENTITY(1, 1) PRIMARY KEY,
	StoreName nvarchar(200) NOT NULL,
	StoreAddress nvarchar(500) NOT NULL,
);

CREATE TABLE ProductsPerStore(
	Quantity int NOT NULL,
	ProductId UNIQUEIDENTIFIER NOT NULL,
	StoreId int NOT NULL,

	CONSTRAINT PK_ProductsPerStore PRIMARY KEY(ProductId, StoreId),
	CONSTRAINT FK_ProductProductsPerStore FOREIGN KEY(ProductId) REFERENCES dbo.tblProducts(ProductId),
	CONSTRAINT FK_StoreProductsPerStore FOREIGN KEY(StoreId) REFERENCES dbo.tblStores(StoreId)
);

ALTER TABLE dbo.tblProducts
	ADD CONSTRAINT FK_PrincipalProductImageProduct FOREIGN KEY(ProductPrincipalImageId) REFERENCES dbo.tblImages(ImageId);
ALTER TABLE dbo.tblProducts
	ADD CONSTRAINT FK_BrandProduct FOREIGN KEY(BrandId) REFERENCES dbo.tblBrands(BrandId);
ALTER TABLE dbo.tblProducts 
	ADD CONSTRAINT FK_SubCategoryProduct FOREIGN KEY(SubCategoryId) REFERENCES dbo.tblSubCategories(SubCategoryId);
