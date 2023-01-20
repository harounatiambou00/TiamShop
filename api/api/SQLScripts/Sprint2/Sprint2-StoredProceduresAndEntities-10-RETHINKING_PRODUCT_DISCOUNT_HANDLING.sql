CREATE TABLE dbo.tblProductDiscounts(
	ProductDiscountId BIGINT IDENTITY(1, 1) PRIMARY KEY NOT NULL,
	ProductDiscountPercentage float NOT NULL,
	ProductDiscountStartDate DATETIME2(7) NOT NULL,
	ProductDiscountEndDate DATETIME2(7) NOT NULL,
	ProductId UNIQUEIDENTIFIER NOT NULL,	

	CONSTRAINT FK_Product_ProductDiscount FOREIGN KEY(ProductId) REFERENCES dbo.tblProducts(ProductId)
);

ALTER TABLE dbo.tblProductDiscounts
ADD CONSTRAINT PK_ProductDiscountId_ProductDiscounts PRIMARY KEY(ProductDiscountId)

ALTER TABLE dbo.tblProducts
DROP COLUMN Discount;

ALTER TABLE dbo.tblProducts
ADD ProductDiscountId BIGINT NULL;

ALTER TABLE dbo.tblProducts
ADD CONSTRAINT FK_ProductDiscount_Product FOREIGN KEY(ProductDiscountId) REFERENCES dbo.tblProductDiscounts(ProductDiscountId)