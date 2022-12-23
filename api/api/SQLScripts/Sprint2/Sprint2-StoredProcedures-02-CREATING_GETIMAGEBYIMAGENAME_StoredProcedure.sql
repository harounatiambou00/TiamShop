CREATE PROCEDURE dbo.GetImageByImageName
@ImageName nvarchar(100)
AS
SELECT * FROM dbo.tblImages
WHERE ImageName = @ImageName;
GO