# consumeCountriesAPI

# API Endpoints

	http://localhost:3000
		
		/api/currencies
                    Get all currency symbols that are used by more than one country
		/api/timedifference
		/api/timedifference?country1=AFG&country2=LKA
			Get time difference between countries. Above example returns time difference between Afganistan and Sri Lanka 
			(use alpha3Code instead of alpha2Code)
		/api/region
		/api/region?region=asia
			Get all countries in a region sorted by population. Above example returns all countries in Asia
			
