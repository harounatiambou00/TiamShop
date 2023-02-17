DROP PROCEDURE dbo.AllGetProductGrades;
GO

CREATE PROCEDURE dbo.GetAllProductGrades 
AS
SELECT * FROM dbo.tblProductGrade
GO