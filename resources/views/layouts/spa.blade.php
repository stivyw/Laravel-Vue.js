<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Code Fin</title>

    <!-- Styles -->
    <link href="{{ asset('css/spa.css') }}" rel="stylesheet">
    <script>
        window.Laravel = <?php echo json_encode([
            'csrfToken' => csrf_token(),
        ]); ?>
    </script>
</head>
<body>
    <app> </app>	
    <!-- Scripts -->
    <script src="{{ asset('build/spa.bundle.js') }}"></script>
</body>
</html>
