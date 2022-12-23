CREATE PROCEDURE dbo.GetAllBrands
AS 
SELECT * FROM dbo.tblBrands
GO

CREATE PROCEDURE dbo.GetBrandById
@BrandId int
AS 
SELECT * FROM dbo.tblBrands
WHERE BrandId = @BrandId
GO

CREATE PROCEDURE dbo.GetBrandByName
@BrandName nvarchar(100)
AS 
SELECT * FROM dbo.tblBrands
WHERE BrandName = @BrandName
GO

CREATE PROCEDURE dbo.GetImageOfBrand
@BrandId int
AS 
EXEC dbo.GetImageById (SELECT BrandImageId from dbo.tblBrands WHERE BrandId = @BrandId);
GO

CREATE PROCEDURE dbo.InsertBrand 
@BrandName nvarchar(100), @PartnershipDate DATETIME2, @BrandWebsiteLink nvarchar(max), @BrandImageId bigint
AS
INSERT INTO dbo.tblBrands VALUES(@BrandName, @PartnershipDate, @BrandWebsiteLink, @BrandImageId);
GO

CREATE PROCEDURE dbo.UpdateBrand 
@BrandId int, @BrandName nvarchar(100), @PartnershipDate DATETIME2, @BrandWebsiteLink nvarchar(max), @BrandImageId bigint
AS
UPDATE dbo.tblBrands SET BrandName = @BrandName, PartnershipDate = @PartnershipDate, BrandWebsiteLink = @BrandWebsiteLink, BrandImageId = @BrandImageId
WHERE BrandId = @BrandId;
GO