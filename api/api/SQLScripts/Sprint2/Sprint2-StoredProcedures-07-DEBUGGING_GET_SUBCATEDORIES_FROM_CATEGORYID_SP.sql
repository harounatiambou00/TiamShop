CREATE PROCEDURE dbo.GetSubCategoriesOfCategory
@CategoryId int
AS 
SELECT * FROM tblSubCategories WHERE CategoryId = @CategoryId;
GO