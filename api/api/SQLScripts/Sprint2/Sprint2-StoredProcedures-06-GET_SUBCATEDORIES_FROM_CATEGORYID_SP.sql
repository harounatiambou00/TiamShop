CREATE PROCEDURE dbo.GetSubCategoriesOfCategory
@CategoryId int
AS 
SELECT * FROM tbl.SubCategories WHERE CategoryId = @CategoryId;
GO