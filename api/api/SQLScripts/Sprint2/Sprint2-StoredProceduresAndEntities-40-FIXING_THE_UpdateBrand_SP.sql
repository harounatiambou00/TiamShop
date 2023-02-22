ALTER PROCEDURE dbo.UpdateBrand 
    @BrandId INT, 
    @BrandName NVARCHAR(100), 
    @PartnershipDate DATETIME2, 
    @BrandWebsiteLink nvarchar(max), 
    @BrandImageId bigint
AS
BEGIN
    UPDATE dbo.tblBrands 
    SET 
        BrandName = @BrandName, 
        PartnershipDate = @PartnershipDate, 
        BrandWebsiteLink = @BrandWebsiteLink, 
        BrandImageId = @BrandImageId 
    WHERE 
        BrandId = @BrandId;
END
GO


