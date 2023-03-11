CREATE PROCEDURE dbo.CreateOrderLine
@Quantity INT, @DiscountPercentage FLOAT, @OrderId BIGINT, @ProductId NVARCHAR(100)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from 
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @ID UNIQUEIDENTIFIER
    SET @ID = TRY_CONVERT(UNIQUEIDENTIFIER, @ProductId)

    IF (@ID IS NULL)
    BEGIN
        RETURN NULL
    END
    ELSE
	BEGIN
		INSERT INTO dbo.tblOrderLines VALUES(@Quantity, @DiscountPercentage, @OrderId, @ID) 
	END
END
GO

CREATE PROCEDURE dbo.UpdateOrderLine
@OrderLineId BIGINT, @Quantity INT, @DiscountPercentage FLOAT, @OrderId BIGINT, @ProductId NVARCHAR(100)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from 
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @ID UNIQUEIDENTIFIER
    SET @ID = TRY_CONVERT(UNIQUEIDENTIFIER, @ProductId)

    IF (@ID IS NULL)
    BEGIN
        RETURN NULL
    END
    ELSE
	BEGIN
		UPDATE dbo.tblOrderLines SET Quantity = @Quantity, DiscountPercentage = @DiscountPercentage, OrderId = @OrderId, ProductId = @ID 
	END
END
GO

CREATE PROCEDURE DeleteOrderLine
@OrderLineId BIGINT
AS
BEGIN
DELETE FROM dbo.tblOrderLines WHERE OrderLineId = @OrderLineId;
END
GO
CREATE PROCEDURE GetOrderLineById
@OrderLineId BIGINT
AS
BEGIN
SELECT * FROM dbo.tblOrderLines WHERE OrderLineId = @OrderLineId;
END
GO