CREATE PROCEDURE DeleteSubCategory
@SubCategoryId INT
AS
/*
	The DECLARE CURSOR statement creates a cursor that selects all the values from the dbo.MyTable table. The OPEN statement opens the cursor and the FETCH statement retrieves the first row from the cursor and assigns it to the @Value variable.
	The WHILE loop iterates as long as the @@FETCH_STATUS variable equals 0, which indicates that there are more rows to fetch. On each iteration, the statements inside the loop are executed. In this case, it's just printing the value of the @Value variable.
	Finally, the CLOSE statement closes the cursor and the DEALLOCATE statement releases the resources associated with the cursor.
	It's important to note that, using cursors can be resource-intensive and can lead to poor performance, especially when working with large data sets. Also, it's important to keep in mind that if the table will be updated while the cursor is open, the results of the cursor may be affected by the updates. If you need to iterate over a large set of data, it's recommended to use a WHILE loop in combination with a TOP clause in your SELECT statement.
*/
DECLARE @ProductIds TABLE (ProductId UNIQUEIDENTIFIER)
DECLARE @CurrenProductId UNIQUEIDENTIFIER
DECLARE iterator CURSOR FOR
   SELECT ProductId FROM dbo.tblProducts WHERE SubCategoryId = @SubCategoryId;
OPEN iterator

FETCH NEXT FROM iterator INTO @CurrenProductId

WHILE @@FETCH_STATUS = 0
BEGIN
   -- statements to execute
   INSERT INTO @ProductIds VALUES(@CurrenProductId)
   FETCH NEXT FROM iterator INTO @CurrenProductId
END

CLOSE iterator
DEALLOCATE iterator

DECLARE iterator2 CURSOR FOR
   SELECT ProductId FROM @ProductIds
OPEN iterator2

FETCH NEXT FROM iterator2 INTO @CurrenProductId

WHILE @@FETCH_STATUS = 0
BEGIN
   -- statements to execute
   EXEC DeleteProduct @CurrenProductId
   FETCH NEXT FROM iterator2 INTO @CurrenProductId
END

CLOSE iterator2
DEALLOCATE iterator2

DELETE FROM dbo.tblSubCategories WHERE SubCategoryId = @SubCategoryId
GO