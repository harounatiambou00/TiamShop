USE [TiamshopDB]
GO
/****** Object:  StoredProcedure [dbo].[UpdateProduct]    Script Date: 1/20/2023 2:57:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[UpdateProduct]
@ProductId UNIQUEIDENTIFIER, @ProductReference nvarchar(100), @ProductName nvarchar(100),@ProductDescription nvarchar(max), @ProductPrice MONEY, @ProductQuantity int, @ProductPrincipalImageId bigint, @Waranty NVARCHAR(50), @Color NVARCHAR(50), @BrandId int, @SubCategoryId int
AS
UPDATE dbo.tblProducts SET @ProductReference = @ProductReference, ProductName = @ProductName, ProductDescription = @ProductDescription, ProductPrice = @ProductPrice, ProductQuantity = @ProductQuantity, ProductPrincipalImageId = @ProductPrincipalImageId, Waranty = @Waranty, Color = @Color, BrandId = @BrandId, SubCategoryId = @SubCategoryId OUTPUT inserted.*
WHERE ProductId = @ProductId