namespace api.Models
{
    public class Product
    {
        public Guid ProductId { get;}
        public string ProductReference { get; set; }
        public string ProductName { get; set; } = String.Empty;
        public string ProductDescription { get; set; } = String.Empty;
        public Double ProductPrice { get; set; }
        public int ProductQuantity { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Waranty { get; set; } = String.Empty;
        public string Color { get; set; } = String.Empty;

        public Int64? ProductPrincipalImageId { get; set; }
        public int BrandId { get; set; }
        public int SubCategoryId { get; set; }
        public long? ProductDiscountId { get; set; }

        //Default constructor
        public Product()
        {

        }

        //InsertProduct Constructor
        public Product(string productName,
                       string productDescription,
                       double productPrice,
                       int productQuantity,
                       string waranty,
                       string color,
                       Int64? productPrincipalImageId,
                       int brandId,
                       int subCategoryId,
                       long? productDiscountId)
        {
            ProductId = Guid.NewGuid();
            ProductReference = generateReference(productName, ProductId);
            ProductName = productName;   
            ProductDescription = productDescription;
            ProductPrice = productPrice;
            ProductQuantity = productQuantity;
            CreatedAt = DateTime.Now;
            Waranty = waranty;
            Color = color;
            ProductPrincipalImageId = productPrincipalImageId;
            BrandId = brandId;
            SubCategoryId = subCategoryId;
            ProductDiscountId = productDiscountId;
        }

        //UpdateProduct Constructor
        public Product(
                       Guid productId,
                       string productName,
                       string productDescription,
                       double productPrice,
                       int productQuantity,
                       string waranty,
                       string color,
                       Int64? productPrincipalImageId,
                       int brandId,
                       int subCategoryId,
                       long? productDiscountId)
        {
            ProductId = productId;
            ProductReference = generateReference(productName, ProductId);
            ProductName = productName;
            ProductDescription = productDescription;
            ProductPrice = productPrice;
            ProductQuantity = productQuantity;
            CreatedAt = DateTime.Now;
            Waranty = waranty;
            Color = color;
            ProductPrincipalImageId = productPrincipalImageId;
            BrandId = brandId;
            SubCategoryId = subCategoryId;
            ProductDiscountId = productDiscountId;
        }

        public static string generateReference(string productName, Guid productId)
        {
            string reference = "";
            int i = 0;
            while(reference.Length < 5)
            {
                if (productName[i] != ' ')
                    reference += productName[i];
                i++;
            }
            string lastSevenCharactersOfProducId = productId.ToString().Substring(28);
            reference += lastSevenCharactersOfProducId;
            return reference.ToUpper();
        }
    }
}
