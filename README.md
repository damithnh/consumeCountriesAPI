# consumeCountriesAPI

# API Endpoints

	http://localhost:3000
		
		/api/currency
                    Get all currency symbols that are used by more than one country
		/api/timedifference?country1=AFG&country2=LKA
			Get time difference between countries. Above example returns time difference between Afganistan and Sri Lanka
		/region?region=Asia
			Get all countries in a region sorted by population. Above example returns all countries in Asia
			(There's a bug in this method. It works in synchronous mode, but doesn't work in asynchronous mode)
