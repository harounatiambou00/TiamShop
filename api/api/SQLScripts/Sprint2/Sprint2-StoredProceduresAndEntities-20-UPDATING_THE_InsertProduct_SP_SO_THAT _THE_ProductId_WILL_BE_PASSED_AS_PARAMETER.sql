USE [TiamshopDB]
GO
/****** Object:  StoredProcedure [dbo].[InsertProduct]    Script Date: 1/19/2023 4:55:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[InsertProduct] 
@ProductId NVARCHAR(MAX), @ProductReference CHAR(12), @ProductName nvarchar(100),@ProductDescription nvarchar(max), @ProductPrice MONEY, @ProductQuantity int, @ProductPrincipalImageId bigint, @CreatedAt DATETIME2(7), @Waranty NVARCHAR(50), @Color NVARCHAR(50), @BrandId int, @SubCategoryId int
AS
BEGIN
DECLARE @ID UNIQUEIDENTIFIER
    SET @ID = TRY_CONVERT(UNIQUEIDENTIFIER, @ProductId)

    IF (@ID IS NULL)
    BEGIN
        RETURN NULL
    END
    ELSE
    BEGIN
        INSERT INTO dbo.tblProducts(ProductId, ProductReference, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPrincipalImageId, CreatedAt, Waranty, Color, BrandId, SubCategoryId, ProductDiscountId) 
        VALUES (@ID, @ProductReference, @ProductName, @ProductDescription, @ProductPrice, @ProductQuantity, @ProductPrincipalImageId, @CreatedAt, @Waranty, @Color, @BrandId, @SubCategoryId, NULL)

    END
END