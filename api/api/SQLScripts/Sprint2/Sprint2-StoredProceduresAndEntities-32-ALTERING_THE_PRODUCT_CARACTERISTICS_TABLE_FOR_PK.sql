ALTER TABLE dbo.tblProductCaracteristics 
DROP CONSTRAINT PK_ProductCarateristics_ProductCarateristicID;

ALTER TABLE dbo.tblProductCaracteristics
DROP COLUMN ProductCaracteristicId;

ALTER TABLE dbo.tblProductCaracteristics
ADD ProductCaracteristicId BIGINT IDENTITY(1, 1);

ALTER TABLE dbo.tblProductCaracteristics 
ADD CONSTRAINT PK_ProductCarateristics_ProductCarateristicID PRIMARY KEY(ProductCaracteristicId);