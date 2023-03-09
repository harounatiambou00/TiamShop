CREATE PROCEDURE dbo.CreateDelivery
@DeliveryReference CHAR(12), @DeliveryStatus NVARCHAR(100), @AssignedAt INT = null
AS
INSERT INTO dbo.tblDeliveries VALUES(@DeliveryReference, @DeliveryStatus, NULL, @AssignedAt);
GO

CREATE PROCEDURE dbo.DeleteDelivery
@DeliveryId BIGINT
AS
DELETE FROM dbo.tblDeliveries WHERE DeliveryId = @DeliveryId;
GO

CREATE PROCEDURE dbo.GetAllDeliveries
AS
SELECT * FROM dbo.tblDeliveries;
GO

CREATE PROCEDURE dbo.GetDeliveryById
@DeliveryId BIGINT
AS
SELECT * FROM dbo.tblDeliveries WHERE DeliveryId = @DeliveryId;
GO

CREATE PROCEDURE dbo.GetDeliveryByReference
@DeliveryReference CHAR(12)
AS
SELECT * FROM dbo.tblDeliveries WHERE DeliveryReference = @DeliveryReference;
GO

CREATE PROCEDURE dbo.UpdateDelivery
@DeliveryId BIGINT, @DeliveryReference CHAR(12), @DeliveryStatus NVARCHAR(100), @DeliveredAt DATETIME2(7), @AssignedAt INT
AS
UPDATE dbo.tblDeliveries SET DeliveryReference = @DeliveryReference, DeliveryStatus = @DeliveryStatus, DeliveredAt = @DeliveredAt, AssignedTo = @AssignedAt WHERE DeliveryId = @DeliveryId;
GO