CREATE PROCEDURE dbo.GetPrincipalImageOfProduct
@ProductId NVARCHAR(36)
AS
SELECT * FROM dbo.tblImages WHERE ImageId = (SELECT ProductPrincipalImageId FROM dbo.tblProducts WHERE ProductId = @ProductId)
GO

CREATE PROCEDURE dbo.GetImagesOfProduct
@ProductId NVARCHAR(36)
AS
SELECT I.ImageId, I.ImageName, I.ImageDescription, I.ImageExtension, I.ImageBytes, I.ImageSize FROM dbo.tblImages AS I, dbo.ProductImages AS PrI, dbo.tblProducts Pr
WHERE PrI.ImageId = I.ImageId AND PrI.ProductId = Pr.ProductId;
GO