USE [TiamshopDB]
GO
/****** Object:  StoredProcedure [dbo].[InsertProduct]    Script Date: 1/17/2023 4:53:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[InsertProduct]
@ProductReference CHAR(12), @ProductName nvarchar(100),@ProductDescription nvarchar(max), @ProductPrice MONEY, @ProductQuantity int, @ProductPrincipalImageId bigint, @CreatedAt DATETIME2(7), @Waranty NVARCHAR(50), @Color NVARCHAR(50), @BrandId int, @SubCategoryId int, @ProductDiscountId BIGINT
AS
INSERT INTO dbo.tblProducts(ProductReference, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPrincipalImageId, CreatedAt, Waranty, Color, BrandId, SubCategoryId, ProductDiscountId) VALUES ( @ProductReference, @ProductName, @ProductDescription, @ProductPrice, @ProductQuantity, @ProductPrincipalImageId, @CreatedAt, @Waranty, @Color, @BrandId, @SubCategoryId, @ProductDiscountId)
GO

ALTER PROCEDURE [dbo].[UpdateProduct]
@ProductId UNIQUEIDENTIFIER, @ProductName nvarchar(100),@ProductDescription nvarchar(max), @ProductPrice MONEY, @ProductQuantity int, @ProductPrincipalImageId bigint, @CreatedAt DATETIME2(7), @Waranty NVARCHAR(50), @Color NVARCHAR(50), @BrandId int, @SubCategoryId int, @ProductDiscountId BIGINT
AS
UPDATE dbo.tblProducts SET ProductName = @ProductName, ProductDescription = @ProductDescription, ProductPrice = @ProductPrice, ProductQuantity = @ProductQuantity, ProductPrincipalImageId = @ProductPrincipalImageId, CreatedAt = @CreatedAt, Waranty = @Waranty, Color = @Color, BrandId = @BrandId, SubCategoryId = @SubCategoryId, ProductDiscountId = @ProductDiscountId
WHERE ProductId = @ProductId
GO

CREATE PROCEDURE dbo.GetAllProductDiscounts
AS
SELECT * FROM dbo.tblProductDiscounts
GO

CREATE PROCEDURE dbo.GetProductDiscountById
@ProductDiscountId BIGINT
AS
SELECT * FROM dbo.tblProductDiscounts WHERE ProductDiscountId = @ProductDiscountId
GO

CREATE PROCEDURE dbo.InsertProductDiscount
@ProductDiscountPercentage FLOAT, @ProductDiscountStartDate DATETIME2(7), @ProductDiscountEndDate DATETIME2(7), @ProductId UNIQUEIDENTIFIER
AS
INSERT INTO dbo.tblProductDiscounts VALUES(@ProductDiscountPercentage, @ProductDiscountStartDate, @ProductDiscountEndDate, @ProductId)
GO

CREATE PROCEDURE dbo.UpdateProductDiscount
@ProductDiscountId BIGINT, @ProductDiscountPercentage FLOAT, @ProductDiscountStartDate DATETIME2(7), @ProductDiscountEndDate DATETIME2(7), @ProductId UNIQUEIDENTIFIER
AS
UPDATE dbo.tblProductDiscounts SET ProductDiscountPercentage = @ProductDiscountPercentage, ProductDiscountStartDate = @ProductDiscountStartDate, ProductDiscountEndDate = @ProductDiscountEndDate, ProductId = @ProductId
GO

CREATE PROCEDURE dbo.DeleteProductDiscount
@ProductDiscountId BIGINT
AS
DELETE FROM dbo.tblProductDiscounts WHERE ProductDiscountId = @ProductDiscountId
GO