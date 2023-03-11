CREATE PROCEDURE dbo.GetAllOrders 
AS
SELECT * FROM dbo.tblOrders;
GO

CREATE PROCEDURE dbo.GetOrderById
@OrderId BIGINT
AS
SELECT * FROM dbo.tblOrders WHERE OrderId = @OrderId;
GO

CREATE PROCEDURE dbo.GetOrderByReference 
@OrderReference CHAR(12)
AS
SELECT * FROM dbo.tblOrders WHERE OrderReference = @OrderReference;
GO

CREATE PROCEDURE dbo.GetOrdersOfAClient 
@ClientId INT
AS
SELECT * FROM dbo.tblOrders WHERE ClientId = @ClientId;
GO

CREATE PROCEDURE dbo.GetOrdersOfDelivery
@DeliveryId BIGINT
AS 
SELECT * FROM dbo.tblOrders WHERE DeliveryId = @DeliveryId;
GO

CREATE PROCEDURE dbo.GetOrderLinesOfOrder
@OrderId BIGINT
AS
SELECT * FROM dbo.tblOrderLines WHERE OrderId = @OrderId
GO

CREATE PROCEDURE dbo.GetOrdersByOrdererPhoneNumber
@PhoneNumber CHAR(8)
AS
SELECT * FROM dbo.tblOrders WHERE OrdererPhoneNumber = @PhoneNumber
GO

CREATE PROCEDURE dbo.GetOrdersByOrdererEmail
@OrdererEmail NVARCHAR(100)
AS
SELECT * FROM dbo.tblOrders WHERE OrdererEmail = @OrdererEmail
GO

CREATE PROCEDURE dbo.DeleteOrder
@OrderId BIGINT
AS
DELETE FROM dbo.tblOrderLines WHERE OrderId = @OrderId;
DELETE FROM dbo.tblOrders WHERE OrderId = @OrderId
GO

CREATE PROCEDURE dbo.CreateOrder
@OrderReference CHAR(12), @OrderDate DATETIME2(7), @OrdererFirstName NVARCHAR(100), @OrdererLastName NVARCHAR(100), @OrdererEmail NVARCHAR(100), @OrdererPhoneNumber CHAR(8), @NeighborhoodId INT, @ClientId INT
AS
INSERT INTO dbo.tblOrders VALUES(@OrderReference, @OrderDate, @OrdererFirstName, @OrdererLastName, @OrdererEmail, @OrdererPhoneNumber, NULL, NULL, NULL, @NeighborhoodId, @ClientId, NULL, NULL, NULL);
GO

CREATE PROCEDURE dbo.UpdateOrder
@OrderId BIGINT, @OrderReference CHAR(12), @OrderDate DATETIME2(7), @OrdererFirstName NVARCHAR(100), @OrdererLastName NVARCHAR(100), @OrdererEmail NVARCHAR(100), @OrdererPhoneNumber CHAR(8), @ValidatedAt DATETIME2(7), @RejectedAt DATETIME2(7), @DeliveredAt DATETIME2(7), @NeighborhoodId INT, @ClientId INT, @AdminWhoValidatedItId INT, @AdminWhoRejectedItId INT, @DeliveryId INT
AS
UPDATE dbo.tblOrders SET OrderReference = @OrderReference, OrderDate = @OrderDate, OrdererFirstName = @OrdererFirstName, OrdererLastName = @OrdererLastName, OrdererEmail = @OrdererEmail, OrdererPhoneNumber = @OrdererPhoneNumber, ValidatedAt = @ValidatedAt, RejectedAt = @RejectedAt, DeliveredAt = @DeliveredAt, NeighborhoodId = @NeighborhoodId, ClientId = @ClientId, @AdminWhoValidatedItId = @AdminWhoValidatedItId, AdminWhoRejectedItId = @AdminWhoRejectedItId, DeliveryId = @DeliveryId
WHERE OrderId = @OrderId
GO