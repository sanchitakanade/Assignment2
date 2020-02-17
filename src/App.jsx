{/*Name: Sanchita Kanade
   Class:CS648.02 Modern Full-Stack Web Development (Spring 2020)
   Assignment: 2
   File: App.jsx
*/}

function ProductRow(props) {
  const product = props.product;
  return(
    <tr>
      <td>{product.productName}</td>
      <td>{("$").concat(product.price)}</td>
      <td>{product.category}</td>
      <td><a href={product.image} target="_blank">View</a></td>
    </tr>
  );
}

function ProductTable(props) {
  const productrows = props.products.map(
    product => <ProductRow key={product.id} product={product}/>);
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {productrows}
      </tbody>
    </table>
  );
}

class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    var price = form.price.value;
    var newPrice = price.substr(1, price.length);
    
    const product = {
      category:form.category.value, price: newPrice, 
      productName: form.productName.value, image:document.getElementById("image").value
    };
    this.props.createProduct(product);
    form.category.value="Shirts";
    form.price.value="$";
    form.productName.value="";
    form.image.value="";
  }
  render() {
    return(
      <form name= "productAdd" onSubmit={this.handleSubmit}>
        <span>
          <label>Category </label>
          <select name="category">
            <option>Shirts</option>
            <option>Jeans</option>
            <option>Jackets</option>
            <option>Sweaters</option>
            <option>Accessories</option>
          </select>
          <label>Product Name </label>
          <input type="text" name="productName"/> 
        </span>
        <span>
          <label>Price Per Unit</label>
          <input type="text" name="price"/>
          <label>Image URL </label>
          <input type="url" name="image" id="image"/>
        </span>
        <button>Add Product</button>
      </form>
    );
  }
}

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {products:[]};
    this.createProduct = this.createProduct.bind(this);
  }
  componentDidMount() {
    document.forms.productAdd.price.value = "$";
  }
  createProduct(product) {
    product.id=this.state.products.length + 1;
    const newProductList = this.state.products.slice();
    newProductList.push(product);
    this.setState({products:newProductList});
  }
  render() {
    return(
      <React.Fragment>
        <h1>My Company Inventory</h1>
        <div>Showing all available products</div>
        <hr/>
        <ProductTable products={this.state.products}/>
        <div>Add a new product to inventory</div>
        <hr/>
        <ProductAdd createProduct={this.createProduct}/>
      </React.Fragment>
    );
  }
}
const element = <ProductList/>
ReactDOM.render(element, document.getElementById('content'));