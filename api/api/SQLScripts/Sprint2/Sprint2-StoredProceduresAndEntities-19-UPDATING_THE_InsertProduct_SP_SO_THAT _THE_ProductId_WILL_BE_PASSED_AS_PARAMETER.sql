USE [TiamshopDB]
GO
/****** Object:  StoredProcedure [dbo].[InsertProduct]    Script Date: 1/19/2023 4:55:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[InsertProduct] 
@ProductId NVARCHAR(36), @ProductReference CHAR(12), @ProductName nvarchar(100),@ProductDescription nvarchar(max), @ProductPrice MONEY, @ProductQuantity int, @ProductPrincipalImageId bigint, @CreatedAt DATETIME2(7), @Waranty NVARCHAR(50), @Color NVARCHAR(50), @BrandId int, @SubCategoryId int
AS
INSERT INTO dbo.tblProducts(ProductId, ProductReference, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPrincipalImageId, CreatedAt, Waranty, Color, BrandId, SubCategoryId, ProductDiscountId) VALUES (TRY_CONVERT(UNIQUEIDENTIFIER, NCHAR(36)), @ProductReference, @ProductName, @ProductDescription, @ProductPrice, @ProductQuantity, @ProductPrincipalImageId, @CreatedAt, @Waranty, @Color, @BrandId, @SubCategoryId, NULL)