CREATE PROCEDURE dbo.GetAllProductCaracteristics 
AS 
SELECT * FROM dbo.tblProductCaracteristics
GO

CREATE PROCEDURE dbo.GetProductCaracteristicById
@ProductCaracteristicId BIGINT
AS 
SELECT * FROM dbo.tblProductCaracteristics WHERE ProductCaracteristicId = @ProductCaracteristicId
GO

CREATE PROCEDURE dbo.GetProductCaracteristicsOfProduct
@ProductId UNIQUEIDENTIFIER
AS
SELECT * FROM dbo.tblProductCaracteristics WHERE ProductID = @ProductId
GO

CREATE PROCEDURE dbo.UpdateProductCaracteristic
@ProductCaracteristicId int, @ProductCaracteristicKey NVARCHAR(500), @ProductCaracteristicValue NVARCHAR(500), @ProductId UNIQUEIDENTIFIER
AS
UPDATE dbo.tblProductCaracteristics SET ProductCaracteristicKey = @ProductCaracteristicKey, ProductCaracteristicValue = @ProductCaracteristicValue, ProductID = @ProductId WHERE ProductCaracteristicId = @ProductCaracteristicId
GO

CREATE PROCEDURE dbo.DeleteProductCaracteristic
@ProductCaracteristicId int
AS 
DELETE FROM dbo.tblProductCaracteristics WHERE ProductCaracteristicId = @ProductCaracteristicId
GO


CREATE PROCEDURE dbo.GetAllProducts
AS
SELECT * FROM dbo.tblProducts
GO

CREATE PROCEDURE dbo.GetProductsBySubCategoryId
@SubCategoryId int
AS
SELECT * FROM dbo.tblProducts WHERE SubCategoryId = @SubCategoryId
GO

CREATE PROCEDURE dbo.GetProductByReference
@ProductReference CHAR(12)
AS
SELECT * FROM dbo.tblProducts WHERE ProductReference = @ProductReference
GO

CREATE PROCEDURE dbo.GetBrandOfProduct
@ProductId UNIQUEIDENTIFIER
AS
SELECT * FROM dbo.tblBrands WHERE BrandId = (SELECT BrandId FROM dbo.tblProducts WHERE ProductId = @ProductId)
GO

CREATE PROCEDURE dbo.GetSubCategoryOfProduct
@ProductId UNIQUEIDENTIFIER
AS
SELECT * FROM dbo.tblBrands WHERE BrandId = (SELECT BrandId FROM dbo.tblProducts WHERE ProductId = @ProductId)
GO

CREATE PROCEDURE dbo.GetPrincipalImageOfProduct
@ProductId UNIQUEIDENTIFIER
AS
SELECT * FROM dbo.tblProductImages WHERE ProductImageId = (SELECT ProductPrincipalImageId FROM dbo.tblProducts WHERE ProductId = @ProductId)
GO

CREATE PROCEDURE dbo.GetImagesOfProduct
@ProductId UNIQUEIDENTIFIER
AS
SELECT * FROM dbo.tblProductImages WHERE ProductId = @ProductId
GO

CREATE PROCEDURE dbo.UpdateProduct
@ProductId UNIQUEIDENTIFIER, @ProductName nvarchar(100),@ProductDescription nvarchar(max), @ProductPrice MONEY, @ProductQuantity int, @ProductPrincipalImageId bigint, @CreatedAt DATETIME2(7), @Waranty NVARCHAR(50), @Color NVARCHAR(50), @Discount FLOAT, @BrandId int, @SubCategoryId int
AS
UPDATE dbo.tblProducts SET ProductName = @ProductName, ProductDescription = @ProductDescription, ProductPrice = @ProductPrice, ProductQuantity = @ProductQuantity, ProductPrincipalImageId = @ProductPrincipalImageId, CreatedAt = @CreatedAt, Waranty = @Waranty, Color = @Color, Discount = @Discount, BrandId = @BrandId, SubCategoryId = @SubCategoryId
WHERE ProductId = @ProductId
GO

CREATE PROCEDURE dbo.InsertProduct
@ProductReference CHAR(12), @ProductName nvarchar(100),@ProductDescription nvarchar(max), @ProductPrice MONEY, @ProductQuantity int, @ProductPrincipalImageId bigint, @CreatedAt DATETIME2(7), @Waranty NVARCHAR(50), @Color NVARCHAR(50), @Discount FLOAT, @BrandId int, @SubCategoryId int
AS
INSERT INTO dbo.tblProducts(ProductReference, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPrincipalImageId, CreatedAt, Waranty, Color, Discount, BrandId, SubCategoryId) VALUES ( @ProductReference, @ProductName, @ProductDescription, @ProductPrice, @ProductQuantity, @ProductPrincipalImageId, @CreatedAt, @Waranty, @Color, @Discount, @BrandId, @SubCategoryId)
GO

CREATE PROCEDURE dbo.InsertProductCaracteristic
@ProductCaracteristicKey NVARCHAR(500), @ProductCaracteristicValue NVARCHAR(500), @ProductId UNIQUEIDENTIFIER
AS
INSERT INTO dbo.tblProductCaracteristics VALUES( @ProductCaracteristicKey, @ProductCaracteristicValue, @ProductId )
GO