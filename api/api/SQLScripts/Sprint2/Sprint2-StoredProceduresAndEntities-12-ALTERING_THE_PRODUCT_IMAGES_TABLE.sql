DROP PROCEDURE dbo.UpdateProductImage;
DROP PROCEDURE dbo.InsertProductImage;
DROP PROCEDURE dbo.GetAllProductImages;
DROP PROCEDURE dbo.DeleteProductImage;
DROP PROCEDURE dbo.GetImagesOfProduct;
DROP PROCEDURE dbo.GetPrincipalImageOfProduct;
DROP PROCEDURE dbo.GetProductImageById;

DECLARE @database nvarchar(50)
DECLARE @table nvarchar(50)

set @database = 'TiamshopDB'
set @table = 'tblProductImages'

DECLARE @sql nvarchar(255)
WHILE EXISTS(select * from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where constraint_catalog = @database and table_name = @table)
BEGIN
    select    @sql = 'ALTER TABLE ' + @table + ' DROP CONSTRAINT ' + CONSTRAINT_NAME 
    from    INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
    where    constraint_catalog = @database and 
            table_name = @table
    exec    sp_executesql @sql
END

DROP TABLE dbo.tblProductImages

CREATE TABLE dbo.tblProductImages(
	ProductImageId BigInt NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	ProductId UNIQUEIDENTIFIER,
	ImageId Bigint UNIQUE,

	CONSTRAINT FK_Product_ProductImage FOREIGN KEY(ProductId) REFERENCES dbo.tblProducts(ProductId),
	CONSTRAINT FK_Image_ProductImage FOREIGN KEY(ImageId) REFERENCES dbo.tblImages(ImageId),
);

