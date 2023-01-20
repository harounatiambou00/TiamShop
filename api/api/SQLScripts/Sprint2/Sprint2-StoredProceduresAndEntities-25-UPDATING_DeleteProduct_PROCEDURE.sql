ALTER PROCEDURE dbo.DeleteProduct
@ProductId NVARCHAR(36)
AS
DELETE FROM dbo.tblProductCaracteristics WHERE ProductId = @ProductId;
DELETE FROM dbo.tblProductDiscounts WHERE ProductId = @ProductId;


/*
	The DECLARE CURSOR statement creates a cursor that selects all the values from the dbo.MyTable table. The OPEN statement opens the cursor and the FETCH statement retrieves the first row from the cursor and assigns it to the @Value variable.
	The WHILE loop iterates as long as the @@FETCH_STATUS variable equals 0, which indicates that there are more rows to fetch. On each iteration, the statements inside the loop are executed. In this case, it's just printing the value of the @Value variable.
	Finally, the CLOSE statement closes the cursor and the DEALLOCATE statement releases the resources associated with the cursor.
	It's important to note that, using cursors can be resource-intensive and can lead to poor performance, especially when working with large data sets. Also, it's important to keep in mind that if the table will be updated while the cursor is open, the results of the cursor may be affected by the updates. If you need to iterate over a large set of data, it's recommended to use a WHILE loop in combination with a TOP clause in your SELECT statement.
*/
DECLARE @ImageIds TABLE (ImageId BIGINT)
DECLARE @CurrentImageId BIGINT
DECLARE iterator CURSOR FOR
   SELECT ImageId FROM dbo.tblProductImages WHERE ProductId = @ProductId;
OPEN iterator

FETCH NEXT FROM iterator INTO @CurrentImageId

WHILE @@FETCH_STATUS = 0
BEGIN
   -- statements to execute
   INSERT INTO @ImageIds VALUES(@CurrentImageId)
   FETCH NEXT FROM iterator INTO @CurrentImageId
END

CLOSE iterator
DEALLOCATE iterator

DELETE FROM dbo.tblProductImages WHERE ProductId = @ProductId


DECLARE iterator2 CURSOR FOR
   SELECT ImageId FROM @ImageIds
OPEN iterator2

FETCH NEXT FROM iterator2 INTO @CurrentImageId

WHILE @@FETCH_STATUS = 0
BEGIN
   -- statements to execute
   DELETE FROM dbo.tblImages WHERE ImageId = @CurrentImageId
   FETCH NEXT FROM iterator2 INTO @CurrentImageId
END

CLOSE iterator2
DEALLOCATE iterator2

ALTER TABLE dbo.tblProducts
DROP CONSTRAINT FK_PrincipalProductImageProduct;
DELETE FROM dbo.tblProducts WHERE ProductId = @ProductId;
ALTER TABLE dbo.tblProducts
ADD CONSTRAINT FK_PrincipalProductImageProduct FOREIGN KEY(ProductPrincipalImageId) REFERENCES dbo.tblImages(ImageId);
GO