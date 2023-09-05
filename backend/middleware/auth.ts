import jwt from "jsonwebtoken"

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401).json({
        error: {
            message: 'Not authorized!'
        }
    });

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        console.log(err)

        if (err) return res.status(403).json({
            error: {
                message: 'Invalid token!'
            }
        });

        req.user = user

        next()
    })
}