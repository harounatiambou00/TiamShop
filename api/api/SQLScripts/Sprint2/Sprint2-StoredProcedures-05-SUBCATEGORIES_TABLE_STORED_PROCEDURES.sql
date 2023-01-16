CREATE PROCEDURE dbo.GetAllSubCategories
AS 
SELECT * FROM dbo.tblSubCategories
GO

CREATE PROCEDURE dbo.GetSubCategoryById
@SubCategoryId int
AS 
SELECT * FROM dbo.tblSubCategories
WHERE SubCategoryId = @SubCategoryId
GO

CREATE PROCEDURE dbo.GetSubCategoryByName
@SubCategoryName NVARCHAR(100)
AS 
SELECT * FROM dbo.tblSubCategories
WHERE SubCategoryName = @SubCategoryName
GO

CREATE PROCEDURE dbo.GetImageOfSubCategory
@SubCategoryId int
AS 
EXEC dbo.GetImageById (SELECT SubCategoryImageId from dbo.tblSubCategories WHERE SubCategoryId = @SubCategoryId);
GO

CREATE PROCEDURE dbo.InsertSubCategory
@SubCategoryName NVARCHAR(100), @SubCategoryTitle NVARCHAR(100), @SubCategoryImageId bigint, @CategoryId int
AS
INSERT INTO dbo.tblSubCategories VALUES(@SubCategoryName, @SubCategoryTitle, @SubCategoryImageId, (SELECT COUNT(*) FROM dbo.tblSubCategories), @CategoryId)
GO

CREATE PROCEDURE dbo.UpdateSubCategory
@SubCategoryId int, @SubCategoryName NVARCHAR(100), @SubCategoryTitle NVARCHAR(100), @SubCategoryImageId bigint, @SubCategoryRanking int, @CategoryId int
AS
UPDATE dbo.tblSubCategories SET SubCategoryName = @SubCategoryName, SubCategoryTitle = @SubCategoryTitle, SubCategoryImageId = @SubCategoryImageId, SubCategoryRanking = @SubCategoryRanking, CategoryId = @CategoryId
WHERE SubCategoryId = @SubCategoryId
GO
