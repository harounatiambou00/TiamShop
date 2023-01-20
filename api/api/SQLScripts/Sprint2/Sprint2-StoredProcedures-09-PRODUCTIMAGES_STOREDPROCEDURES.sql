CREATE PROCEDURE dbo.InsertProductImage
@ProductImageId BIGINT, @ProductId UNIQUEIDENTIFIER
AS
SET IDENTITY_INSERT dbo.tblProducts ON
SET IDENTITY_INSERT dbo.tblImages ON
SET IDENTITY_INSERT dbo.tblProductImages ON
INSERT INTO dbo.tblProductImages(ProductImageId, ProductId) VALUES(@ProductImageId, @ProductId);
SET IDENTITY_INSERT dbo.tblProducts OFF
SET IDENTITY_INSERT dbo.tblImages OFF
SET IDENTITY_INSERT dbo.tblProductImages OFF
GO

CREATE PROCEDURE dbo.UpdateProductImage
@ProductImageId BIGINT, @ProductId UNIQUEIDENTIFIER
AS
UPDATE dbo.tblProductImages SET ProductId = @ProductId
WHERE ProductImageId = @ProductImageId;
GO

CREATE PROCEDURE dbo.GetProductImageById
@ProductImageId BIGINT 
AS
SELECT * FROM dbo.tblProductImages
WHERE ProductImageId = @ProductImageId;
GO

CREATE PROCEDURE dbo.DeleteProductImage
@ProductImageId bigint
AS
DELETE FROM dbo.tblProductImages
WHERE ProductImageId = @ProductImageId;
GO 