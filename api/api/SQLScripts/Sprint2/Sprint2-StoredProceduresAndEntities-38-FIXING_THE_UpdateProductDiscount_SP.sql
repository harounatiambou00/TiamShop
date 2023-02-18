USE [TiamshopDB]
GO
/****** Object:  StoredProcedure [dbo].[UpdateProductDiscount]    Script Date: 2/18/2023 9:45:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[UpdateProductDiscount]
@ProductDiscountId BIGINT, @ProductDiscountPercentage FLOAT, @ProductDiscountStartDate DATETIME2(7), @ProductDiscountEndDate DATETIME2(7), @ProductId UNIQUEIDENTIFIER
AS
UPDATE dbo.tblProductDiscounts SET ProductDiscountPercentage = @ProductDiscountPercentage, ProductDiscountStartDate = @ProductDiscountStartDate, ProductDiscountEndDate = @ProductDiscountEndDate, ProductId = @ProductId WHERE ProductDiscountId = @ProductDiscountId
