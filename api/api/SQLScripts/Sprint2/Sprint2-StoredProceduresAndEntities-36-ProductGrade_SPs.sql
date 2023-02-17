CREATE PROCEDURE dbo.InsertProductGrade
	-- Add the parameters for the stored procedure here
	@Grade SMALLINT, 
	@ProductId NVARCHAR(MAX), 
	@UserId INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from 
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @ID UNIQUEIDENTIFIER
    SET @ID = TRY_CONVERT(UNIQUEIDENTIFIER, @ProductID)

    IF (@ID IS NULL)
    BEGIN
        RETURN NULL
    END
    ELSE
	BEGIN
		INSERT INTO dbo.tblProductGrade VALUES(@Grade, @ID, @UserId)
	END
END
GO

CREATE PROCEDURE dbo.GetProductGradeById 
@ProductGradeId BIGINT
AS
SELECT * FROM dbo.tblProductGrade WHERE ProductGradeId = @ProductGradeId
GO

CREATE PROCEDURE dbo.AllGetProductGrades 
AS
SELECT * FROM dbo.tblProductGrade
GO

CREATE PROCEDURE dbo.DeleteProductGrade
@ProductGradeId BIGINT
AS
DELETE FROM dbo.tblProductGrade WHERE ProductGradeId = @ProductGradeId
GO

CREATE PROCEDURE dbo.UpdateProductGrade
	-- Add the parameters for the stored procedure here
	@ProductGradeId BIGINT,
	@Grade SMALLINT, 
	@ProductId NVARCHAR(MAX), 
	@UserId INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from 
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @ID UNIQUEIDENTIFIER
    SET @ID = TRY_CONVERT(UNIQUEIDENTIFIER, @ProductID)

    IF (@ID IS NULL)
    BEGIN
        RETURN NULL
    END
    ELSE
	BEGIN
		UPDATE dbo.tblProductGrade SET Grade = @GRADE, @ProductId = @ProductId, UserId = @UserId WHERE ProductGradeId = @ProductGradeId
	END
END
GO