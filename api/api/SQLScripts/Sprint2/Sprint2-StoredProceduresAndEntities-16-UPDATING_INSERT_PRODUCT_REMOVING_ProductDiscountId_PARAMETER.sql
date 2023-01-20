USE [TiamshopDB]
GO
/****** Object:  StoredProcedure [dbo].[InsertProduct]    Script Date: 1/19/2023 2:35:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE dbo.InsertProduct 
@ProductReference CHAR(12), @ProductName nvarchar(100),@ProductDescription nvarchar(max), @ProductPrice MONEY, @ProductQuantity int, @ProductPrincipalImageId bigint, @CreatedAt DATETIME2(7), @Waranty NVARCHAR(50), @Color NVARCHAR(50), @BrandId int, @SubCategoryId int
AS
INSERT INTO dbo.tblProducts(ProductReference, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPrincipalImageId, CreatedAt, Waranty, Color, BrandId, SubCategoryId, ProductDiscountId) VALUES ( @ProductReference, @ProductName, @ProductDescription, @ProductPrice, @ProductQuantity, @ProductPrincipalImageId, @CreatedAt, @Waranty, @Color, @BrandId, @SubCategoryId, NULL)
