ALTER PROCEDURE [dbo].[CreateOrder]
@OrderReference CHAR(12), @OrderDate DATETIME2(7), @OrdererFirstName NVARCHAR(100), @OrdererLastName NVARCHAR(100), @OrdererEmail NVARCHAR(100), @OrdererPhoneNumber CHAR(8), @OrdererCompleteAddress NVARCHAR(500), @NeighborhoodId INT, @ClientId INT=NULL, @OrderId BIGINT OUTPUT
AS
INSERT INTO dbo.tblOrders
OUTPUT INSERTED.OrderId
VALUES(@OrderReference, @OrderDate, @OrdererFirstName, @OrdererLastName, @OrdererEmail, @OrdererPhoneNumber, NULL, NULL, NULL, @NeighborhoodId, @ClientId, NULL, NULL, NULL, @OrdererCompleteAddress);

SET @OrderId = SCOPE_IDENTITY();
GO
