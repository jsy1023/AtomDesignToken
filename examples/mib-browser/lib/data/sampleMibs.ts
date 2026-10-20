/**
 * 인터넷 표준 OID 루트 사전 (ISO / Internet root mappings)
 */
export const STANDARD_ROOT_OIDS: Record<string, string> = {
  ccitt: '0',
  iso: '1',
  org: '1.3',
  dod: '1.3.6',
  internet: '1.3.6.1',
  directory: '1.3.6.1.1',
  mgmt: '1.3.6.1.2',
  'mib-2': '1.3.6.1.2.1',
  experimental: '1.3.6.1.3',
  private: '1.3.6.1.4',
  enterprises: '1.3.6.1.4.1',
  security: '1.3.6.1.5',
  snmpV2: '1.3.6.1.6',
  snmpModules: '1.3.6.1.6.3',
};

/**
 * 기본 샘플 MIB 목록
 */
export interface SampleMibEntry {
  id: string;
  name: string;
  fileName: string;
  description: string;
  content: string;
}

export const SAMPLE_MIBS: SampleMibEntry[] = [
  {
    id: 'rfc1213',
    name: 'RFC1213-MIB (MIB-II)',
    fileName: 'RFC1213-MIB.txt',
    description: 'SNMP 네트워크 관리의 표준 기본 MIB (system, interfaces, ip, icmp, tcp, udp, snmp 등)',
    content: `RFC1213-MIB DEFINITIONS ::= BEGIN

IMPORTS
        mgmt, NetworkAddress, IpAddress, Counter, Gauge,
                TimeTicks
            FROM RFC1155-SMI
        OBJECT-TYPE
            FROM RFC-1212;

-- MIB-II root definition
mib-2      OBJECT IDENTIFIER ::= { mgmt 1 }

system       OBJECT IDENTIFIER ::= { mib-2 1 }
interfaces   OBJECT IDENTIFIER ::= { mib-2 2 }
at           OBJECT IDENTIFIER ::= { mib-2 3 }
ip           OBJECT IDENTIFIER ::= { mib-2 4 }
icmp         OBJECT IDENTIFIER ::= { mib-2 5 }
tcp          OBJECT IDENTIFIER ::= { mib-2 6 }
udp          OBJECT IDENTIFIER ::= { mib-2 7 }
egp          OBJECT IDENTIFIER ::= { mib-2 8 }
snmp         OBJECT IDENTIFIER ::= { mib-2 11 }

-- System Group

sysDescr OBJECT-TYPE
    SYNTAX  DisplayString (SIZE (0..255))
    ACCESS  read-only
    STATUS  mandatory
    DESCRIPTION
            "A textual description of the entity.  This value
            should include the full name and version
            identification of the system's hardware type,
            software operating-system, and networking
            software."
    ::= { system 1 }

sysObjectID OBJECT-TYPE
    SYNTAX  OBJECT IDENTIFIER
    ACCESS  read-only
    STATUS  mandatory
    DESCRIPTION
            "The vendor's authoritative identification of the
            network management subsystem contained in the
            entity."
    ::= { system 2 }

sysUpTime OBJECT-TYPE
    SYNTAX  TimeTicks
    ACCESS  read-only
    STATUS  mandatory
    DESCRIPTION
            "The time (in hundredths of a second) since the
            network management portion of the system was last
            re-initialized."
    ::= { system 3 }

sysContact OBJECT-TYPE
    SYNTAX  DisplayString (SIZE (0..255))
    ACCESS  read-write
    STATUS  mandatory
    DESCRIPTION
            "The textual identification of the contact person
            for this managed node, together with information
            on how to contact this person."
    ::= { system 4 }

sysName OBJECT-TYPE
    SYNTAX  DisplayString (SIZE (0..255))
    ACCESS  read-write
    STATUS  mandatory
    DESCRIPTION
            "An administratively-assigned name for this
            managed node. By convention, this is the node's
            fully-qualified domain name."
    ::= { system 5 }

sysLocation OBJECT-TYPE
    SYNTAX  DisplayString (SIZE (0..255))
    ACCESS  read-write
    STATUS  mandatory
    DESCRIPTION
            "The physical location of this node (e.g.,
            'telephone closet, 3rd floor')."
    ::= { system 6 }

sysServices OBJECT-TYPE
    SYNTAX  INTEGER (0..127)
    ACCESS  read-only
    STATUS  mandatory
    DESCRIPTION
            "A value which indicates the set of services that
            this entity primarily offers."
    ::= { system 7 }

-- Interfaces Group

ifNumber OBJECT-TYPE
    SYNTAX  INTEGER
    ACCESS  read-only
    STATUS  mandatory
    DESCRIPTION
            "The number of network interfaces (regardless of
            their current state) present on this system."
    ::= { interfaces 1 }

ifTable OBJECT-TYPE
    SYNTAX  SEQUENCE OF IfEntry
    ACCESS  not-accessible
    STATUS  mandatory
    DESCRIPTION
            "A list of interface entries.  The number of
            entries is given by the value of ifNumber."
    ::= { interfaces 2 }

ifEntry OBJECT-TYPE
    SYNTAX  IfEntry
    ACCESS  not-accessible
    STATUS  mandatory
    DESCRIPTION
            "An interface entry containing information at the
            subnetwork layer and below for a particular
            interface."
    INDEX   { ifIndex }
    ::= { ifTable 1 }

IfEntry ::=
    SEQUENCE {
        ifIndex
            INTEGER,
        ifDescr
            DisplayString,
        ifType
            INTEGER,
        ifMtu
            INTEGER,
        ifSpeed
            Gauge,
        ifPhysAddress
            PhysAddress,
        ifAdminStatus
            INTEGER,
        ifOperStatus
            INTEGER,
        ifLastChange
            TimeTicks,
        ifInOctets
            Counter,
        ifInUcastPkts
            Counter,
        ifInNUcastPkts
            Counter,
        ifInDiscards
            Counter,
        ifInErrors
            Counter,
        ifInUnknownProtos
            Counter,
        ifOutOctets
            Counter,
        ifOutUcastPkts
            Counter,
        ifOutNUcastPkts
            Counter,
        ifOutDiscards
            Counter,
        ifOutErrors
            Counter,
        ifOutQLen
            Gauge,
        ifSpecific
            OBJECT IDENTIFIER
    }

ifIndex OBJECT-TYPE
    SYNTAX  INTEGER
    ACCESS  read-only
    STATUS  mandatory
    DESCRIPTION
            "A unique value for each interface.  Its value
            ranges between 1 and the value of ifNumber."
    ::= { ifEntry 1 }

ifDescr OBJECT-TYPE
    SYNTAX  DisplayString (SIZE (0..255))
    ACCESS  read-only
    STATUS  mandatory
    DESCRIPTION
            "A textual string containing information about the
            interface.  This string should include the name of
            the manufacturer, the product name and the version
            of the hardware interface."
    ::= { ifEntry 2 }

ifType OBJECT-TYPE
    SYNTAX  INTEGER {
                other(1),
                regular1822(2),
                hdh1822(3),
                ddn-x25(4),
                rfc877-x25(5),
                ethernet-csmacd(6),
                iso88023-csmacd(7),
                iso88024-tokenBus(8),
                iso88025-tokenRing(9),
                fddi(15),
                ppp(23),
                softwareLoopback(24)
            }
    ACCESS  read-only
    STATUS  mandatory
    DESCRIPTION
            "The type of interface, distinguished according to
            the physical/link protocol(s) immediately 'below'
            the network layer in the protocol stack."
    ::= { ifEntry 3 }

ifSpeed OBJECT-TYPE
    SYNTAX  Gauge
    ACCESS  read-only
    STATUS  mandatory
    DESCRIPTION
            "An estimate of the interface's current bandwidth
            in bits per second."
    ::= { ifEntry 5 }

ifInOctets OBJECT-TYPE
    SYNTAX  Counter
    ACCESS  read-only
    STATUS  mandatory
    DESCRIPTION
            "The total number of octets received on the
            interface, including framing characters."
    ::= { ifEntry 10 }

ifOutOctets OBJECT-TYPE
    SYNTAX  Counter
    ACCESS  read-only
    STATUS  mandatory
    DESCRIPTION
            "The total number of octets transmitted out of the
            interface, including framing characters."
    ::= { ifEntry 16 }

END`,
  },
  {
    id: 'host-resources',
    name: 'HOST-RESOURCES-MIB',
    fileName: 'HOST-RESOURCES-MIB.txt',
    description: '서버 호스트 CPU, 메모리, 저장소 및 프로세스 모니터링 OID (hrSystem, hrStorage, hrDevice)',
    content: `HOST-RESOURCES-MIB DEFINITIONS ::= BEGIN

IMPORTS
    MODULE-IDENTITY, OBJECT-TYPE, Integer32, Gauge32,
    Counter32, TimeTicks
        FROM SNMPv2-SMI
    DisplayString, DateAndTime, TruthValue
        FROM SNMPv2-TC
    mib-2
        FROM RFC1213-MIB;

host MODULE-IDENTITY
    LAST-UPDATED "200003060000Z"
    ORGANIZATION "IETF Host Resources MIB Working Group"
    CONTACT-INFO "Internet Engineering Task Force"
    DESCRIPTION
            "This MIB is for use in managing host systems."
    ::= { mib-2 25 }

hrSystem        OBJECT IDENTIFIER ::= { host 1 }
hrStorage       OBJECT IDENTIFIER ::= { host 2 }
hrDevice        OBJECT IDENTIFIER ::= { host 3 }
hrSWRun         OBJECT IDENTIFIER ::= { host 4 }
hrSWRunPerf     OBJECT IDENTIFIER ::= { host 5 }
hrSWInstalled   OBJECT IDENTIFIER ::= { host 6 }

-- hrSystem Group

hrSystemUptime OBJECT-TYPE
    SYNTAX     TimeTicks
    MAX-ACCESS read-only
    STATUS     current
    DESCRIPTION
            "The amount of time since this host was last
            initialized."
    ::= { hrSystem 1 }

hrSystemDate OBJECT-TYPE
    SYNTAX     DateAndTime
    MAX-ACCESS read-write
    STATUS     current
    DESCRIPTION
            "The host's notion of the local date and time of day."
    ::= { hrSystem 2 }

hrSystemInitialLoadDevice OBJECT-TYPE
    SYNTAX     Integer32 (1..2147483647)
    MAX-ACCESS read-write
    STATUS     current
    DESCRIPTION
            "The index of the hrDeviceEntry for the device from
            which this host's operating system was loaded."
    ::= { hrSystem 3 }

hrSystemNumUsers OBJECT-TYPE
    SYNTAX     Gauge32
    MAX-ACCESS read-only
    STATUS     current
    DESCRIPTION
            "The number of currently logged in users for this system."
    ::= { hrSystem 5 }

hrSystemProcesses OBJECT-TYPE
    SYNTAX     Gauge32
    MAX-ACCESS read-only
    STATUS     current
    DESCRIPTION
            "The number of operating system processes currently
            executing on this host."
    ::= { hrSystem 6 }

-- hrStorage Group

hrMemorySize OBJECT-TYPE
    SYNTAX     Integer32 (0..2147483647)
    UNITS      "KBytes"
    MAX-ACCESS read-only
    STATUS     current
    DESCRIPTION
            "The amount of physical read-write main memory on this
            host (in Kilobytes)."
    ::= { hrStorage 2 }

hrStorageTable OBJECT-TYPE
    SYNTAX     SEQUENCE OF HrStorageEntry
    MAX-ACCESS not-accessible
    STATUS     current
    DESCRIPTION
            "A table (list) of storage areas on the host."
    ::= { hrStorage 3 }

hrStorageEntry OBJECT-TYPE
    SYNTAX     HrStorageEntry
    MAX-ACCESS not-accessible
    STATUS     current
    DESCRIPTION
            "An entry containing objects for a particular storage
            area on the host."
    INDEX      { hrStorageIndex }
    ::= { hrStorageTable 1 }

HrStorageEntry ::= SEQUENCE {
    hrStorageIndex          Integer32,
    hrStorageType           OBJECT IDENTIFIER,
    hrStorageDescr          DisplayString,
    hrStorageAllocationUnits Integer32,
    hrStorageSize           Integer32,
    hrStorageUsed           Integer32,
    hrStorageAllocationFailures Counter32
}

hrStorageIndex OBJECT-TYPE
    SYNTAX     Integer32 (1..2147483647)
    MAX-ACCESS read-only
    STATUS     current
    DESCRIPTION
            "A unique value for each logical storage area to which
            this entry pertains."
    ::= { hrStorageEntry 1 }

hrStorageDescr OBJECT-TYPE
    SYNTAX     DisplayString
    MAX-ACCESS read-only
    STATUS     current
    DESCRIPTION
            "A description of the type and instance of the storage
            described by this entry."
    ::= { hrStorageEntry 3 }

hrStorageSize OBJECT-TYPE
    SYNTAX     Integer32 (0..2147483647)
    MAX-ACCESS read-write
    STATUS     current
    DESCRIPTION
            "The size of the storage represented by this entry, in
            units of hrStorageAllocationUnits."
    ::= { hrStorageEntry 5 }

hrStorageUsed OBJECT-TYPE
    SYNTAX     Integer32 (0..2147483647)
    MAX-ACCESS read-only
    STATUS     current
    DESCRIPTION
            "The amount of storage represented by this entry that
            is currently in use."
    ::= { hrStorageEntry 6 }

-- hrDevice Group

hrDeviceTable OBJECT-TYPE
    SYNTAX     SEQUENCE OF HrDeviceEntry
    MAX-ACCESS not-accessible
    STATUS     current
    DESCRIPTION
            "A list of devices contained by the host."
    ::= { hrDevice 2 }

hrDeviceEntry OBJECT-TYPE
    SYNTAX     HrDeviceEntry
    MAX-ACCESS not-accessible
    STATUS     current
    DESCRIPTION
            "An entry containing objects for a particular device
            contained by the host."
    INDEX      { hrDeviceIndex }
    ::= { hrDeviceTable 1 }

HrDeviceEntry ::= SEQUENCE {
    hrDeviceIndex   Integer32,
    hrDeviceType    OBJECT IDENTIFIER,
    hrDeviceDescr   DisplayString,
    hrDeviceID      OBJECT IDENTIFIER,
    hrDeviceStatus  INTEGER,
    hrDeviceErrors  Counter32
}

hrDeviceIndex OBJECT-TYPE
    SYNTAX     Integer32 (1..2147483647)
    MAX-ACCESS read-only
    STATUS     current
    DESCRIPTION
            "A unique value for each device contained by the host."
    ::= { hrDeviceEntry 1 }

hrDeviceDescr OBJECT-TYPE
    SYNTAX     DisplayString (SIZE (0..64))
    MAX-ACCESS read-only
    STATUS     current
    DESCRIPTION
            "A textual description of this device, including the
            device's manufacturer and revision."
    ::= { hrDeviceEntry 3 }

END`,
  },
  {
    id: 'custom-enterprise',
    name: 'ENTERPRISE-CUSTOM-MIB',
    fileName: 'ENTERPRISE-CUSTOM-MIB.txt',
    description: '기업 프라이빗 엔터프라이즈 모니터링 OID (enterprises.99999.serviceOps)',
    content: `ENTERPRISE-CUSTOM-MIB DEFINITIONS ::= BEGIN

IMPORTS
    MODULE-IDENTITY, OBJECT-TYPE, Integer32, Counter64
        FROM SNMPv2-SMI
    enterprises
        FROM RFC1155-SMI;

acmeCorp MODULE-IDENTITY
    LAST-UPDATED "202610200000Z"
    ORGANIZATION "Acme Cloud Platform Corp"
    CONTACT-INFO "ops@acme.example.com"
    DESCRIPTION  "Acme Cloud microservices and infrastructure MIB"
    ::= { enterprises 99999 }

acmeCluster      OBJECT IDENTIFIER ::= { acmeCorp 1 }
acmeServices     OBJECT IDENTIFIER ::= { acmeCorp 2 }
acmeSecurity     OBJECT IDENTIFIER ::= { acmeCorp 3 }

clusterHealthStatus OBJECT-TYPE
    SYNTAX      INTEGER { ok(1), degraded(2), critical(3) }
    MAX-ACCESS  read-only
    STATUS      current
    DESCRIPTION "Global cluster health score computed across nodes"
    ::= { acmeCluster 1 }

activePodsCount OBJECT-TYPE
    SYNTAX      Integer32
    MAX-ACCESS  read-only
    STATUS      current
    DESCRIPTION "Number of running container pods in this cluster"
    ::= { acmeCluster 2 }

apiTotalRequests OBJECT-TYPE
    SYNTAX      Counter64
    MAX-ACCESS  read-only
    STATUS      current
    DESCRIPTION "Total API requests processed since cluster startup"
    ::= { acmeServices 1 }

apiErrorRate OBJECT-TYPE
    SYNTAX      Integer32
    MAX-ACCESS  read-only
    STATUS      current
    DESCRIPTION "HTTP 5xx error rate expressed in basis points (1/100 of a percent)"
    ::= { acmeServices 2 }

END`,
  },
];
