<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.1/css/bootstrap.min.css">
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Registro de Usuarios</title>

</head>
<body>
<form action="/beeter-auth/ServletRegister" method="POST">

     <div class="container">

      <form class="form-signin">
        <h2 class="form-signin-heading">Nuevo registro</h2>
          
          <label for="Name">Username:</label>

          
          
          <input type="text" class="form-control" name="username" placeholder="username" required autofocus>
              <label for="Name">Password:</label>
                 <input type="password" class="form-control"  name="password" placeholder="password" required>
                     <label for="Name">Name</label>
                     <input type="text" class="form-control"  name="name" placeholder="name" required>
                         <label for="Name">Email</label>
        <input type="text" class="form-control" placeholder="email"  name="email" required>
     
        
        <button class="btn btn-lg btn-primary btn-block" type="submit">Registar</button>
      </form>

    </div> <!-- /container -->
	 <!-- 	 <form action="/beeter-auth/ServletRegister" method="POST">

		Username:<input type="text" name="username" /><br /> <br />
		Password:<input type="password" name="password" /><br /> <br />
		Name:<input type="text" name="name" /><br /> <br /> Email:<input
			type="text" name="email" /><br /> <br /> <br /> <input
			type="submit" value="register" />

	</form> -->

</body>
</html>