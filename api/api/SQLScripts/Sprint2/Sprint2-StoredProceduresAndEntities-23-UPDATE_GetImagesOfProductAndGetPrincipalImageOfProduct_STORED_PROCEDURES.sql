ALTER PROCEDURE dbo.GetImagesOfProduct
@ProductId NVARCHAR(36)
AS
SELECT I.ImageId, I.ImageName, I.ImageDescription, I.ImageExtension, I.ImageBytes, I.ImageSize FROM dbo.tblImages AS I, dbo.tblProductImages AS PrI
WHERE PrI.ImageId = I.ImageId AND PrI.ProductId = @ProductId;
GO