CREATE PROCEDURE dbo.GetProductById
@ProductId UNIQUEIDENTIFIER
AS
SELECT * FROM dbo.tblProducts WHERE ProductId = @ProductId
GO