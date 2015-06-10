## Deploy

1. Deploy your code

	#### Deploy DEVELOPMENT to http://b-reel-bcn.com:3000
	```sh
	# note: push your changes to origin/development
	$ pm2 deploy ecosystem_development.json development
	```

	#### Deploy STAGING to http://b-reel-bcn.com:4000
	```sh
	# note: push your changes to origin/staging
	$ pm2 deploy ecosystem_staging.json staging
	```

	#### Deploy to http://byggdforatttaskit.se

	```sh
	# note: push your changes to origin/master
	$ pm2 deploy ecosystem_production.json production
	```

2. Check online application:

	env|url
	-----|----
	development |[http://b-reel-bcn.com:3000/]()
	staging |[http://b-reel-bcn.com:4000/]()
	production |[http://byggdforatttaskit.se/]()

	```
	username: breel
	password: 3G!WdGqj
	```

3. Check your app

	```sh
	# development
	$ ssh root@162.209.3.192

	# staging
	$ ssh root@162.209.3.192

	# or production
	$ ssh nahuel.scotti@byggdforatttaskit.se

	$ pm2 logs skoda # or skoda_dev
	$ pm2 desc skoda # or skoda_dev
	$ pm2 monit
```