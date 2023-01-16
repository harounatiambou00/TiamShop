CREATE PROCEDURE dbo.GetAllCategories
AS 
SELECT * FROM dbo.tblCategories
GO

CREATE PROCEDURE dbo.GetCategoryById
@CategoryId int
AS 
SELECT * FROM dbo.tblCategories
WHERE CategoryId = @CategoryId
GO

CREATE PROCEDURE dbo.GetCategoryByName
@CategoryName NVARCHAR(100)
AS 
SELECT * FROM dbo.tblCategories
WHERE CategoryName = @CategoryName
GO

CREATE PROCEDURE dbo.GetImageOfCategory
@CategoryId int
AS 
EXEC dbo.GetImageById (SELECT CategoryImageId from dbo.tblCategories WHERE CategoryId = @CategoryId);
GO

CREATE PROCEDURE dbo.InsertCategory
@CategoryName NVARCHAR(100), @CategoryTitle NVARCHAR(100), @CategoryImageId bigint
AS
INSERT INTO dbo.tblCategories VALUES(@CategoryName, @CategoryTitle, @CategoryImageId, (SELECT COUNT(*) FROM dbo.tblCategories))
GO

CREATE PROCEDURE dbo.UpdateCategory
@CategoryId int, @CategoryName NVARCHAR(100), @CategoryTitle NVARCHAR(100), @CategoryImageId bigint, @CategoryRanking int
AS
UPDATE dbo.tblCategories SET CategoryName = @CategoryName, CategoryTitle = @CategoryTitle, CategoryImageId = @CategoryImageId, CategoryRanking = @CategoryRanking
WHERE CategoryId = @CategoryId
GO
