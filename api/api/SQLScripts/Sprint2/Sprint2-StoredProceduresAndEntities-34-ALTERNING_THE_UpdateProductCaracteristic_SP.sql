USE [TiamshopDB]
GO
/****** Object:  StoredProcedure [dbo].[InsertProductCaracteristic]    Script Date: 2/6/2023 7:03:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[UpdateProductCaracteristic]
	-- Add the parameters for the stored procedure here
	@ProductCaracteristicId int,
	@ProductCaracteristicKey NVARCHAR(500), 
	@ProductCaracteristicValue NVARCHAR(500), 
	@ProductID NVARCHAR(MAX)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @ID UNIQUEIDENTIFIER
    SET @ID = TRY_CONVERT(UNIQUEIDENTIFIER, @ProductID)

    IF (@ID IS NULL)
    BEGIN
        RETURN NULL
    END
    ELSE
	BEGIN
		UPDATE dbo.tblProductCaracteristics SET ProductCaracteristicKey = @ProductCaracteristicKey, ProductCaracteristicValue = @ProductCaracteristicValue, ProductID = @ID WHERE ProductCaracteristicId = @ProductCaracteristicId
	END
END
