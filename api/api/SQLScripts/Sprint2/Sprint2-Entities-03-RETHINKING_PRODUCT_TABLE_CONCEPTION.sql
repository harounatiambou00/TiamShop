ALTER TABLE dbo.tblProducts 
DROP CONSTRAINT DF__tblProduc__Smart__236943A5, DF__tblProduc__Touch__2180FB33, DF__tblProduc__Doubl__22751F6C;
ALTER TABLE dbo.tblProducts 
DROP COLUMN OperatingSystem, RAM, HardDisks, Processor, GraphicCard, InputOutputs, ScreenSize, ScreenResolution, TouchScreen, Network, Camera, DoubleCamera, SmartTV;

CREATE TABLE dbo.tblProductCaracteristics (
	ProductCaracteristicId BIGINT NOT NULL IDENTITY(1, 1),
	ProductCaracteristicKey NVARCHAR(500) NOT NULL,
	ProductCaracteristicValue NVARCHAR(500) NOT NULL,
	ProductID UNIQUEIDENTIFIER,

	CONSTRAINT PK_ProductCarateristics_ProductCarateristicID PRIMARY KEY(ProductCaracteristicId),
	CONSTRAINT FK_Product_ProductCaracteristics FOREIGN KEY(ProductId) REFERENCES dbo.tblProducts(ProductId)
);