echo '==========Testes de Autenticação:=============================='

echo '	- registro'
http PUT localhost:3001/auth/register name='teste' email='teste' password='teste' username='teste' phone='12345678'  address='rua dos Bobos, 0'
echo ' '

echo '	- registro repetido'
http PUT localhost:3001/auth/register name='teste' email='teste' password='teste' username='teste' phone='12345678'  address='rua dos Bobos, 0'
echo ' '

echo '	- login'
http POST localhost:3001/auth/login email='teste' password='teste'
token=$(http POST localhost:3001/auth/login email='teste' password='teste' | jq -r   '.token' )
id=$(http POST localhost:3001/auth/login email='teste' password='teste' | jq -r '.id' )
echo ' '

echo '	- login inválido'
http POST localhost:3001/auth/login email='teste' password='outra coisa'
echo ' '

echo '===========Testes Endpoints Públicos:==========================='

echo '	- produtos por criador'
http GET localhost:3001/products?creator=60fdff27dece1620976bdc71
echo ' '

echo '	- produtos por dono'
http GET localhost:3001/products?owner=60fda15d0101e73af96846bd
echo ' '

echo '	- produtos com a palavra Objeto'
http GET localhost:3001/products?search=Objeto
echo ' '

echo '	- um produto'
http GET localhost:3001/products/6100a658aa10c67e46e825d0
echo ' '

echo '	- um nome'
http GET localhost:3001/name/60fdff27dece1620976bdc71
echo ' '

echo '===========Testes Endpoints Privados:==========================='

echo '	- adicionar produto'
http PUT localhost:3001/user/product auth:"$token" name='teste' description='teste' quantity:=10 price:=99.99 image='https://static9.depositphotos.com/1684360/1193/i/950/depositphotos_11930317-stock-photo-scantron-test-blocks-and-pencil.jpg'
echo ' '

echo '	- total acumulado'
http GET localhost:3001/user/total auth:"$token"
echo ' '

echo '===========Testes de Admin:==========================='

admin=$(http POST localhost:3001/auth/login email='admin' password='admin' | jq -r  '.token' )
product_id=$(http GET localhost:3001/products?owner=$id | jq -r '.products' | jq -r '.[0]' | jq -r '._id')

echo '	- apagar produto'
http DELETE localhost:3001/admin/products/$product_id auth:"$admin"
echo ' '

echo '	- apagar usuário'
http DELETE localhost:3001/admin/users/$id auth:"$admin"
echo ' '











		
