CREATE PROCEDURE dbo.InsertProductImage
@ProductId UNIQUEIDENTIFIER, @ImageId BIGINT
AS
INSERT INTO dbo.tblProductImages VALUES(@ProductId, @ImageId);
GO

CREATE PROCEDURE dbo.UpdateProductImage
@ProductImageId BIGINT, @ProductId UNIQUEIDENTIFIER, @ImageId BIGINT
AS
UPDATE dbo.tblProductImages SET ProductId = @ProductId, ImageId = @ImageId
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