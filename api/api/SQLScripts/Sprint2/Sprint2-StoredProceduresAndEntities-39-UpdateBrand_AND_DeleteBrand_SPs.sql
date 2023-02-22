CREATE PROCEDURE dbo.UpdateBrand 
@BrandId INT, @BrandName NVARCHAR(100), @PartnershipDate DATETIME2, @BrandWebsiteLink nvarchar(max), @BrandImageId bigint
AS
UPDATE dbo.tblBrands SET BrandName = @BrandName, PartnershipDate = @PartnershipDate, BrandWebsiteLink = @BrandWebsiteLink, BrandImageId = @BrandImageId 
GO

CREATE PROCEDURE dbo.DeleteBrand 
@BrandId int
AS
DELETE FROM dbo.tblBrands WHERE BrandId = @BrandId
GO