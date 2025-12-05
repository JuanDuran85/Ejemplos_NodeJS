import { Router } from 'express';




export class AppRoutes {


  static get routes(): Router {

    const router: Router = Router();
    
    // Definir las rutas
    // router.use('/api/todos', /*TodoRoutes.routes */ );



    return router;
  }


}

