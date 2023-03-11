USE [TiamshopDB]
GO
/****** Object:  StoredProcedure [dbo].[UpdateOrder]    Script Date: 3/10/2023 6:42:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[UpdateOrder]
@OrderId BIGINT, @OrderReference CHAR(12), @OrderDate DATETIME2(7), @OrdererFirstName NVARCHAR(100), @OrdererLastName NVARCHAR(100), @OrdererEmail NVARCHAR(100), @OrdererPhoneNumber CHAR(8), @OrdererCompleteAdress NVARCHAR(500), @ValidatedAt DATETIME2(7)=NULL, @RejectedAt DATETIME2(7)=NULL, @DeliveredAt DATETIME2(7)=NULL, @NeighborhoodId INT, @ClientId INT=NULL, @AdminWhoValidatedItId INT=NULL, @AdminWhoRejectedItId INT=NULL, @DeliveryId INT=NULL
AS
UPDATE dbo.tblOrders SET OrderReference = @OrderReference, OrderDate = @OrderDate, OrdererFirstName = @OrdererFirstName, OrdererLastName = @OrdererLastName, OrdererEmail = @OrdererEmail, OrdererPhoneNumber = @OrdererPhoneNumber, OrdererCompleteAdress = @OrdererCompleteAdress , ValidatedAt = @ValidatedAt, RejectedAt = @RejectedAt, DeliveredAt = @DeliveredAt, NeighborhoodId = @NeighborhoodId, ClientId = @ClientId, @AdminWhoValidatedItId = @AdminWhoValidatedItId, AdminWhoRejectedItId = @AdminWhoRejectedItId, DeliveryId = @DeliveryId
WHERE OrderId = @OrderId
GO

ALTER PROCEDURE [dbo].[CreateOrder]
@OrderReference CHAR(12), @OrderDate DATETIME2(7), @OrdererFirstName NVARCHAR(100), @OrdererLastName NVARCHAR(100), @OrdererEmail NVARCHAR(100), @OrdererPhoneNumber CHAR(8), @OrdererCompleteAddress NVARCHAR(500), @NeighborhoodId INT, @ClientId INT=NULL
AS
INSERT INTO dbo.tblOrders VALUES(@OrderReference, @OrderDate, @OrdererFirstName, @OrdererLastName, @OrdererEmail, @OrdererPhoneNumber, NULL, NULL, NULL, @NeighborhoodId, @ClientId, NULL, NULL, NULL, @OrdererCompleteAddress);
GO