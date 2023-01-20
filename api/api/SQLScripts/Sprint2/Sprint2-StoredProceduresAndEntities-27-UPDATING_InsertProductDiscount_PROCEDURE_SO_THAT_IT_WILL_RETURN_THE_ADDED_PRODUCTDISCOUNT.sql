USE [TiamshopDB]
GO
/****** Object:  StoredProcedure [dbo].[InsertProductDiscount]    Script Date: 1/20/2023 3:43:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[InsertProductDiscount]
@ProductDiscountPercentage FLOAT, @ProductDiscountStartDate DATETIME2(7), @ProductDiscountEndDate DATETIME2(7), @ProductId UNIQUEIDENTIFIER
AS
INSERT INTO dbo.tblProductDiscounts OUTPUT inserted.* VALUES(@ProductDiscountPercentage, @ProductDiscountStartDate, @ProductDiscountEndDate, @ProductId)

