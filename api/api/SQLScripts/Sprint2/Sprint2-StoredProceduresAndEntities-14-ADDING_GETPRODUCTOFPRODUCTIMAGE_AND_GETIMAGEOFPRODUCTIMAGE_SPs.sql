CREATE PROCEDURE dbo.GetProductOfProductImage
@ProductImageId BIGINT 
AS
SELECT * FROM dbo.tblProducts Pr, dbo.tblProductImages PrI
WHERE PrI.ProductImageId = @ProductImageId AND Pr.ProductId = PrI.ProductId ;
GO

CREATE PROCEDURE dbo.GetImageOfProductImage
@ProductImageId BIGINT 
AS
SELECT * FROM dbo.tblImages AS I, dbo.tblProductImages AS PrI
WHERE PrI.ProductImageId = @ProductImageId AND I.ImageId = PrI.ImageId;
GO