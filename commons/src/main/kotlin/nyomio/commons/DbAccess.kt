package nyomio.commons

import io.micronaut.context.annotation.Property
import nyomio.commons.revisionedentity.RevisionEndTable
import nyomio.commons.revisionedentity.RevisionTable
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.transactions.transaction
import org.slf4j.LoggerFactory
import java.sql.Connection
import javax.inject.Singleton

@Singleton
class DbAccess
constructor(
        @Property(name = "db.connection-string")
        private val dbConnectionString: String,
        @Property(name = "db.driver")
        private val dbDriver: String,
        @Property(name = "db.user")
        private val dbUser: String,
        @Property(name = "db.password")
        private val dbPass: String,
        @Property(name = "db.create-tables", value = "false")
        private val dbCreateTables: Boolean,
        private val connectionBuilder: (() -> Connection)? = null
) {
    private val logger = LoggerFactory.getLogger(DbAccess::class.java)

    private var tableListProvider: (() -> Array<Table>)? = null

    val db by lazy {
        if (connectionBuilder != null) {
            Database.connect(connectionBuilder)
        } else {
            Database.connect(dbConnectionString, dbDriver, dbUser, dbPass)
        }.also {
            if (dbCreateTables) {
                if (logger.isDebugEnabled) {
                    logger.debug("Updating schema because db.create-tables property is set to true")
                }
                transaction(it) {
                    tableListProvider?.let {
                        SchemaUtils.createMissingTablesAndColumns(*(it()), RevisionTable, RevisionEndTable)
                    }
                            ?: logger.error("TableList not initialized before lazy instantiating db connection")

                }
            }
        }
    }

    fun setTableListProvider(provider: () -> Array<Table>) {
        tableListProvider = provider
    }

}

