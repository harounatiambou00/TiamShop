CREATE PROCEDURE dbo.InsertImage
@ImageName nvarchar(100),
@ImageDescription nvarchar(500),
@ImageExtension nvarchar(10),
@ImageBytes  varbinary(max), 
@ImageSize decimal(7)
AS
INSERT INTO dbo.tblImages VALUES(@ImageName, @ImageDescription, @ImageExtension, @ImageBytes, @ImageSize);
GO

CREATE PROCEDURE dbo.UpdateImage
@ImageId bigint, 
@ImageName nvarchar(100),
@ImageDescription nvarchar(500),
@ImageExtension nvarchar(10),
@ImageBytes  varbinary(max), 
@ImageSize decimal(7)
AS
UPDATE dbo.tblImages SET ImageName = @ImageName, ImageDescription = @ImageDescription, ImageExtension = @ImageExtension, ImageBytes =  @ImageBytes, ImageSize = @ImageSize
WHERE ImageId = @ImageId;
GO

CREATE PROCEDURE dbo.GetImageById
@ImageId bigint
AS
SELECT * FROM dbo.tblImages
WHERE ImageId = @ImageId;
GO

CREATE PROCEDURE dbo.GetImageByName
@ImageName nvarchar(100)
AS
SELECT * FROM dbo.tblImages
WHERE ImageName = @ImageName;
GO

CREATE PROCEDURE dbo.DeleteImage
@ImageId bigint
AS
DELETE FROM dbo.tblImages
WHERE ImageId = @ImageId;
GO